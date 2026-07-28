#include <Wire.h>
#include <PulsePosition.h>

/* ================= CONFIG ================= */
#define MPU_ADDR 0x68
#define LOOP_HZ 500.0f
#define DT (1.0f / LOOP_HZ)

/* ================= MOTOR ================= */
#define MOTOR_KILL 800
#define MOTOR_MIN 970
#define MOTOR_MAX 1900

#define PIN_FR 1
#define PIN_RR 2
#define PIN_RL 3
#define PIN_FL 4

/* ================= RC CHANNELS ================= */
#define ROLL_CH 1
#define PITCH_CH 2
#define THR_CH 3
#define YAW_CH 4
#define ARM_CH 5

/* ================= RATE LIMITS ================= */
#define MAX_RATE_ROLL 250.0f
#define MAX_RATE_PITCH 250.0f
#define MAX_RATE_YAW 250.0f

/* =================  PID ================= */
// PID for angle - outer loop
// float KP_R = 0.09f, KI_R = 0.0050f, KD_R = 0.0012f;
// float KP_P = 0.12f, KI_P = 0.0020f, KD_P = 0.0012f;
float KP_R = 1.80f, KI_R = 0, KD_R = 0;
float KP_P = 2.0f, KI_P = 0, KD_P = 0;

/* ================= GLOBAL ================= */
PulsePositionInput ReceiverInput(RISING);
float ReceiverValue[8] = { 0 };

float gx_rad, gy_rad, gz_rad;
float roll_deg = 0, pitch_deg = 0;

float iR = 0, iP = 0, iY = 0;
float prevER = 0, prevEP = 0, prevEY = 0;

float iRateR = 0, iRateP = 0, iRateY = 0;
float prevRateER = 0, prevRateEP = 0, prevRateEY = 0;
// PID for rate - inner loop
// Jan 2, 17:02
// float KP_RateR = 0.6f, KI_RateR = 1.0f, KD_RateR = 0.03f;
// float KP_RateP = 0.6f, KI_RateP = 3.5f, KD_RateP = 0.03f;
// float KP_Y = 2.0f, KI_Y = 6.0f, KD_Y = 0.0000f;

// Jan 12, 20h15

// float KP_RateR = 0.6f, KI_RateR = 0.0f, KD_RateR = 0.003f;
// float KP_RateP = 0.6f, KI_RateP = 0.0f, KD_RateP = 0.003f;
// float KP_Y = 2.0f, KI_Y = 0.0f, KD_Y = 0.0000f;

float KP_RateR = 0.25f, KI_RateR = 0.5f, KD_RateR = 0.01f;

float KP_RateP = 0.3f, KI_RateP = 0.6f, KD_RateP = 0.0097f;


float KP_Y = 2.0f, KI_Y = 0.0f, KD_Y = 0.0000f;

// float KalmanAngleRoll=0, KalmanUncertaintyAngleRoll=2*2;
// float KalmanAnglePitch=0, KalmanUncertaintyAnglePitch=2*2;
float KalmanAngleRoll = 0, KalmanUncertaintyAngleRoll = 1 * 5;
float KalmanAnglePitch = 0, KalmanUncertaintyAnglePitch = 1 * 5;
float Kalman1DOutput[] = { 0, 0 };

float MotorInput1;
float MotorInput2;
float MotorInput3;
float MotorInput4;

unsigned long loopTimer;

/* ================= CALIBRATION ================= */
bool calibDone = false;
unsigned long calibStart;
long calibCount = 0;

float gyroBiasX = 0, gyroBiasY = 0, gyroBiasZ = 0;
float accBiasX = 0, accBiasY = 0, accBiasZ = 0;

/* ================= ACCEL LPF ================= */
float ax_f = 0, ay_f = 0, az_f = 1.0f;
const float ACC_LPF_ALPHA = 1.0f;  // 100 Hz @ 250 Hz loop

//
struct TelemetryPacket {
  float motor1;
  float motor2;
  float motor3;
  float motor4;

  float kalmanRoll;
  float kalmanPitch;

  float inputRoll;
  float inputPitch;
  float inputYaw;
  float outR;
  float outP;
  // float gyroBiasX;
  // float gyroBiasY;
  // float gyroBiasZ;

  // float accBiasX;
  // float accBiasY;
  // float accBiasZ;

  // float gx;
  // float gy;
  // float gz;
};

TelemetryPacket pkt;
#define TELEMETRY_HZ 10
#define TELEMETRY_PERIOD_US (1000000UL / TELEMETRY_HZ)

uint32_t telemetryTimer = 0;

#define PKT_HEADER 0xAA

uint8_t checksum(const uint8_t *data, size_t len) {
  uint8_t cs = 0;
  for (size_t i = 0; i < len; i++) cs ^= data[i];
  return cs;
}

/* ================= EKF-STYLE ATTITUDE FILTER ================= */
void readIMURaw(int16_t &ax, int16_t &ay, int16_t &az,
                int16_t &gx, int16_t &gy, int16_t &gz) {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 14);

  ax = Wire.read() << 8 | Wire.read();
  ay = Wire.read() << 8 | Wire.read();
  az = Wire.read() << 8 | Wire.read();
  Wire.read();
  Wire.read();
  gx = Wire.read() << 8 | Wire.read();
  gy = Wire.read() << 8 | Wire.read();
  gz = Wire.read() << 8 | Wire.read();
}

// void ekfUpdate(float gx, float gy, float gz,
//                float ax, float ay, float az,
//                float dt,
//                float &roll_out, float &pitch_out) {
//   static float q0 = 1, q1 = 0, q2 = 0, q3 = 0;

//   float halfdt = 0.5f * dt;
//   q0 += (-q1 * gx - q2 * gy - q3 * gz) * halfdt;
//   q1 += (q0 * gx + q2 * gz - q3 * gy) * halfdt;
//   q2 += (q0 * gy - q1 * gz + q3 * gx) * halfdt;
//   q3 += (q0 * gz + q1 * gy - q2 * gx) * halfdt;

//   float n = sqrtf(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
//   q0 /= n;
//   q1 /= n;
//   q2 /= n;
//   q3 /= n;

//   float amag = sqrtf(ax * ax + ay * ay + az * az);
//   if (fabsf(amag - 1.0f) < 0.25f) {
//     ax /= amag;
//     ay /= amag;
//     az /= amag;

//     float ex = ay * (q0 * q0 - q1 * q1 - q2 * q2 + q3 * q3);
//     float ey = -ax * (q0 * q0 - q1 * q1 - q2 * q2 + q3 * q3);

//     q0 += 0.5f * (-q1 * ex - q2 * ey) * dt;
//     q1 += 0.5f * (q0 * ex) * dt;
//     q2 += 0.5f * (q0 * ey) * dt;

//     n = sqrtf(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
//     q0 /= n;
//     q1 /= n;
//     q2 /= n;
//     q3 /= n;
//   }

//   roll_out = atan2f(2 * (q0 * q1 + q2 * q3),
//                     1 - 2 * (q1 * q1 + q2 * q2))
//              * 57.29578f;
//   pitch_out = asinf(constrain(2 * (q0 * q2 - q3 * q1), -1, 1)) * 57.29578f;
// }

void kalman_1d(float &KalmanState,
               float &KalmanUncertainty,
               float KalmanInput,
               float KalmanMeasurement) {
  KalmanState = KalmanState + 0.004 * KalmanInput;

  KalmanUncertainty = KalmanUncertainty + 0.004 * 0.004 * 4 * 4;
  float KalmanGain = KalmanUncertainty * 1 / (1 * KalmanUncertainty + 2 * 2);
  KalmanState = KalmanState + KalmanGain * (KalmanMeasurement - KalmanState);
  KalmanUncertainty = (1 - KalmanGain) * KalmanUncertainty;
  Kalman1DOutput[0] = KalmanState;
  Kalman1DOutput[1] = KalmanUncertainty;
}

/* ================= IMU ================= */
void readIMU() {
  int16_t axr, ayr, azr, gxr, gyr, gzr;
  readIMURaw(axr, ayr, azr, gxr, gyr, gzr);

  gx_rad = ((gxr / 65.5f) - gyroBiasX);  // * DEG_TO_RAD;
  gy_rad = ((gyr / 65.5f) - gyroBiasY);  // * DEG_TO_RAD;
  // gy_rad = ((gxr / 65.5f) - gyroBiasX);// * DEG_TO_RAD;
  // gx_rad = -((gyr / 65.5f) - gyroBiasY);// * DEG_TO_RAD;
  gz_rad = ((gzr / 65.5f) - gyroBiasZ);  // * DEG_TO_RAD;

  float ax = axr / 4096.0f - accBiasX;
  float ay = ayr / 4096.0f - accBiasY;
  // float ay = axr / 4096.0f - accBiasX;
  // float ax = -ayr / 4096.0f - accBiasY - 0.1;
  float az = azr / 4096.0f - accBiasZ;

  ax_f = ax;
  ay_f = ay;
  az_f = az;

  /* ===== ACCEL LOW-PASS FILTER (100 Hz) ===== */
  // ax_f += ACC_LPF_ALPHA * (ax - ax_f);
  // ay_f += ACC_LPF_ALPHA * (ay - ay_f);
  // az_f += ACC_LPF_ALPHA * (az - az_f);

  roll_deg = atan(ay_f / sqrt(ax_f * ax_f + az_f * az_f)) * 1 / (3.142 / 180);
  pitch_deg = -atan(ax_f / sqrt(ay_f * ay_f + az_f * az_f)) * 1 / (3.142 / 180);
  // pitch_deg = atan(ay_f / sqrt(ax_f * ax_f + az_f * az_f)) * 1 / (3.142 / 180);
  // roll_deg = atan(ax_f / sqrt(ay_f * ay_f + az_f * az_f)) * 1 / (3.142 / 180);
}

/* ================= PID ================= */
float pidStep(float err,
              float &iTerm,
              float &prevErr,
              float kp,
              float ki,
              float kd) {
  // ----- P term -----
  float pTerm = kp * err;

  // ----- I term (trapezoidal integration) -----
  iTerm += ki * (err + prevErr) * 0.004f * 0.5f;

  // Anti-windup (same as old code)
  if (iTerm > 400.0f) iTerm = 400.0f;
  else if (iTerm < -400.0f) iTerm = -400.0f;

  // ----- D term -----
  float dTerm = kd * (err - prevErr) / 0.004f;

  // Save error for next step
  prevErr = err;

  // ----- PID output -----
  float output = pTerm + iTerm + dTerm;

  // Output saturation (same as old code)
  if (output > 400.0f) output = 400.0f;
  else if (output < -400.0f) output = -400.0f;

  return output;
}


/* ================= SETUP ================= */
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  Serial5.begin(9600);
  Wire.begin();
  Wire.setClock(400000);

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B);
  Wire.write(0x00);
  Wire.endTransmission();

  // Set MPU6050 Digital Low-Pass Filter (~44 Hz)
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x1A);  // CONFIG register
  Wire.write(0x03);  // DLPF_CFG = 3 → ~44 Hz accel & gyro LPF
  Wire.endTransmission(true);

  ReceiverInput.begin(14);

  analogWriteResolution(12);
  analogWriteFrequency(PIN_FR, 250);
  analogWriteFrequency(PIN_RR, 250);
  analogWriteFrequency(PIN_RL, 250);
  analogWriteFrequency(PIN_FL, 250);

  pinMode(PIN_FR, OUTPUT);
  pinMode(PIN_RR, OUTPUT);
  pinMode(PIN_RL, OUTPUT);
  pinMode(PIN_FL, OUTPUT);

  analogWrite(PIN_FR, MOTOR_KILL);
  analogWrite(PIN_RR, MOTOR_KILL);
  analogWrite(PIN_RL, MOTOR_KILL);
  analogWrite(PIN_FL, MOTOR_KILL);

  loopTimer = micros();
  digitalWrite(LED_BUILTIN, LOW);
}

/* ================= LOOP ================= */
void loop() {
  uint32_t now = micros();
  int n = ReceiverInput.available();
  for (int i = 1; i <= n; i++) ReceiverValue[i - 1] = ReceiverInput.read(i);

  if (!calibDone) {
    if (calibCount == 0) calibStart = millis();

    int16_t ax, ay, az, gx, gy, gz;
    readIMURaw(ax, ay, az, gx, gy, gz);

    gyroBiasX += gx / 65.5f;
    gyroBiasY += gy / 65.5f;
    gyroBiasZ += gz / 65.5f;

    accBiasX += ax / 4096.0f;
    accBiasY += ay / 4096.0f;
    accBiasZ += (az / 4096.0f - 1.0f);

    calibCount++;

    if (millis() - calibStart >= 5000) {
      gyroBiasX /= calibCount;
      gyroBiasY /= calibCount;
      gyroBiasZ /= calibCount;

      accBiasX /= calibCount;
      accBiasY /= calibCount;
      accBiasZ /= calibCount;

      calibDone = true;
      digitalWrite(LED_BUILTIN, HIGH);
    }

    analogWrite(PIN_FR, MOTOR_KILL);
    analogWrite(PIN_RR, MOTOR_KILL);
    analogWrite(PIN_RL, MOTOR_KILL);
    analogWrite(PIN_FL, MOTOR_KILL);

    while (micros() - loopTimer < (1000000 / LOOP_HZ))
      ;
    loopTimer = micros();
    return;
  }

  readIMU();

  if (ReceiverValue[ARM_CH - 1] < 1500) {
    analogWrite(PIN_FR, MOTOR_KILL);
    analogWrite(PIN_RR, MOTOR_KILL);
    analogWrite(PIN_RL, MOTOR_KILL);
    analogWrite(PIN_FL, MOTOR_KILL);
    iR = iP = iY = prevER = prevEP = prevEY = 0;
  } else {
    // Line 157-160
    kalman_1d(KalmanAngleRoll, KalmanUncertaintyAngleRoll, gx_rad, roll_deg);
    KalmanAngleRoll = Kalman1DOutput[0];
    KalmanUncertaintyAngleRoll = Kalman1DOutput[1];

    kalman_1d(KalmanAnglePitch, KalmanUncertaintyAnglePitch, gy_rad, pitch_deg);
    KalmanAnglePitch = Kalman1DOutput[0];
    KalmanUncertaintyAnglePitch = Kalman1DOutput[1];
    // ---- FAILSAFE CHECK ----

    float desR = (ReceiverValue[ROLL_CH - 1] - 1500) * MAX_RATE_ROLL / 2500.0f;
    float desP = (ReceiverValue[PITCH_CH - 1] - 1500) * MAX_RATE_PITCH / 2500.0f;
    float desY = (ReceiverValue[YAW_CH - 1] - 1500) * MAX_RATE_YAW / 2500.0f;

    // Jan 12
    static float KalmanAngleRoll_f = 0.0f;
    static float KalmanAnglePitch_f = 0.0f;
    KalmanAngleRoll_f += ACC_LPF_ALPHA * (KalmanAngleRoll - KalmanAngleRoll_f);
    KalmanAnglePitch_f += ACC_LPF_ALPHA * (KalmanAnglePitch - KalmanAnglePitch_f);

    // Line 166-167
    float ErrorAngleRoll = desR - KalmanAngleRoll_f;
    float ErrorAnglePitch = desP - KalmanAnglePitch_f;

    // Outer loop
    // Line 169: DesiredRateRoll
    float outR = pidStep(ErrorAngleRoll, iR, prevER, KP_R, KI_R, KD_R);
    // Line 171: DesiredRatePitch
    float outP = pidStep(ErrorAnglePitch, iP, prevEP, KP_P, KI_P, KD_P);

    // static float outP_f = 0.0f;
    // static float outR_f = 0.0f;
    // static float ACC_LPF_outer_loop = 0.9f;
    // outP_f += ACC_LPF_outer_loop * (outP - outP_f);
    // outR_f += ACC_LPF_outer_loop * (outR - outR_f);

    float DesiredRatePitch = outP;
    float DesiredRateRoll = outR;

    // Line 172 - 174
    float ErrorRateRoll = DesiredRateRoll - gx_rad;
    float ErrorRatePitch = DesiredRatePitch - gy_rad;
    float ErrorRateYaw = desY - gz_rad;

    // InputThrottle
    float base = map((int)ReceiverValue[THR_CH - 1], 1000, 2000, MOTOR_MIN, MOTOR_MAX);

    if (base < 1050) {
      iRateR = iRateP = iY = 0;
      prevRateER = prevRateEP = prevEY = 0;
    }

    // Line 180: InputYaw
    float InputRoll = pidStep(ErrorRateRoll, iRateR, prevRateER, KP_RateR, KI_RateR, KD_RateR);
    float InputPitch = pidStep(ErrorRatePitch, iRateP, prevRateEP, KP_RateP, KI_RateP, KD_RateP);
    float InputYaw = pidStep(ErrorRateYaw, iY, prevEY, KP_Y, KI_Y, KD_Y);


    if (base < 1050) {
      InputRoll = 0;
      InputPitch = 0;
      InputYaw = 0;
    }

    // Add deadzone to prevent jitter
    if (abs(InputRoll) < 2.0) InputRoll = 0;
    if (abs(InputPitch) < 2.0) InputPitch = 0;
    if (abs(InputYaw) < 1.0) InputYaw = 0;

    // Line 173 - 176
    MotorInput1 = base - InputRoll - InputPitch - InputYaw;
    MotorInput2 = base - InputRoll + InputPitch + InputYaw;
    MotorInput3 = base + InputRoll + InputPitch - InputYaw;
    MotorInput4 = base + InputRoll - InputPitch + InputYaw;

    int ThrottleIdle = 1100;
    if (MotorInput1 < ThrottleIdle) MotorInput1 = ThrottleIdle ;
    if (MotorInput2 < ThrottleIdle) MotorInput2 = ThrottleIdle  ;
    if (MotorInput3 < ThrottleIdle) MotorInput3 = ThrottleIdle - 300;
    if (MotorInput4 < ThrottleIdle) MotorInput4 = ThrottleIdle - 300;

    analogWrite(PIN_FR, constrain(MotorInput1, MOTOR_MIN, MOTOR_MAX));
    analogWrite(PIN_RR, constrain(MotorInput2, MOTOR_MIN, MOTOR_MAX));
    analogWrite(PIN_RL, constrain(MotorInput3, MOTOR_MIN, MOTOR_MAX));
    analogWrite(PIN_FL, constrain(MotorInput4, MOTOR_MIN, MOTOR_MAX));

    Serial.print("KalmanAngleRoll:");
    Serial.print(KalmanAngleRoll);
    Serial.print(",");
    Serial.print("KalmanAnglePitch:");
    Serial.println(KalmanAnglePitch);
    Serial.print(",");


    // // Serial.print("iR:");
    // // Serial.print(iR);
    // // Serial.print(",");

    // Serial.print("DesiredRateRoll:");
    // Serial.print(DesiredRateRoll);
    // Serial.print(",");

    // Serial.print("gx_rad:");
    // Serial.print(gx_rad);
    // Serial.print(",");

    // // Serial.print("iRateR:");
    // // Serial.print(iRateR);
    // // Serial.print(",");



    // // Serial.print("gz_rad:");
    // // Serial.print(gz_rad);
    // // Serial.print(",");

    // // Serial.print("desY:");
    // // Serial.print(desY);
    // // Serial.print(",");

    // Serial.print("iY:");
    // Serial.print(iY);
    // Serial.print(",");

    // Serial.print("ErrorRateYaw:");
    // Serial.println(ErrorRateYaw);
    // Serial.print(",");

    // Serial.print("Base:");
    // Serial.print(base);
    // Serial.print(",");

    // Serial.print("InputRoll:");
    // Serial.print(InputRoll);
    // Serial.print(",");

    // Serial.print("InputPitch:");
    // Serial.print(InputPitch);
    // Serial.print(",");

    // Serial.print("InputYaw:");
    // Serial.println(InputYaw);
    // Serial.print(",");

    // Serial.print("1:");
    // Serial.print(2000);
    // Serial.print(",");
    // Serial.print("2:");
    // Serial.print(970);
    // Serial.print(",");
    // Serial.print("M1:");
    // Serial.print(MotorInput1);
    // Serial.print(",");
    // Serial.print("M2:");
    // Serial.print(MotorInput2);
    // Serial.print(",");
    // Serial.print("M3:");
    // Serial.print(MotorInput3);
    // Serial.print(",");
    // Serial.print("M4:");
    // Serial.println(MotorInput4);

    // Serial.print(",");
    int loop_time = micros() - loopTimer;
    // Serial5.print("loop:");
    // Serial5.println(loop_time);
    Serial.print("loop:");
    Serial.println(loop_time);
    //     Serial.print(MotorInput1); Serial.print(",");
    // Serial.print(MotorInput2); Serial.print(",");
    // Serial.print(MotorInput3); Serial.print(",");
    // Serial.print(MotorInput4); Serial.print(",");

    // Serial.print(KalmanAngleRoll); Serial.print(",");
    // Serial.print(KalmanAnglePitch); Serial.print(",");

    // Serial.print(InputRoll); Serial.print(",");
    // Serial.print(InputPitch); Serial.print(",");
    // Serial.print(InputYaw); Serial.print(",");

    // Serial.print(gyroBiasX); Serial.print(",");
    // Serial.print(gyroBiasY); Serial.print(",");
    // Serial.print(gyroBiasZ); Serial.print(",");

    // Serial.print(accBiasX); Serial.print(",");
    // Serial.print(accBiasY); Serial.print(",");
    // Serial.print(accBiasZ); Serial.print(",");

    // Serial.print(gx_rad); Serial.print(",");
    // Serial.print(gy_rad); Serial.print(",");
    // Serial.println(gz_rad);


    // Serial.println(",");

    // Serial.print("RR:");
    // Serial.println(MotorInput2);

    if (now - telemetryTimer >= TELEMETRY_PERIOD_US) {
      telemetryTimer = now;

      TelemetryPacket pkt;

      pkt.motor1 = MotorInput1;
      pkt.motor2 = MotorInput2;
      pkt.motor3 = MotorInput3;
      pkt.motor4 = MotorInput4;

      pkt.kalmanRoll = KalmanAngleRoll_f;
      pkt.kalmanPitch = KalmanAnglePitch_f;

      pkt.inputRoll = InputRoll;
      pkt.inputPitch = InputPitch;
      pkt.inputYaw = InputYaw;

      pkt.outR = outR;
      pkt.outP = outP;

      // pkt.gyroBiasX = gyroBiasX;
      // pkt.gyroBiasY = gyroBiasY;
      // pkt.gyroBiasZ = gyroBiasZ;

      // pkt.accBiasX = accBiasX;
      // pkt.accBiasY = accBiasY;
      // pkt.accBiasZ = accBiasZ;

      // pkt.gx = gx_rad;
      // pkt.gy = gy_rad;
      // pkt.gz = gz_rad;

      Serial5.write(PKT_HEADER);
      Serial5.write((uint8_t *)&pkt, sizeof(pkt));
      Serial5.write(checksum((uint8_t *)&pkt, sizeof(pkt)));
    }
  }

  while (micros() - loopTimer < (1000000 / LOOP_HZ))
    ;
  loopTimer = micros();
}
