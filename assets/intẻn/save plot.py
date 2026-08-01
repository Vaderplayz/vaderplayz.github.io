#!/usr/bin/env python3
import os
import time
import zipfile
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# === CONFIGURE THESE ===
PX4_LOG_URL = "https://logs.px4.io/plot_app?log=c7118f98-987f-437e-a926-540726ec44b8"
OUTPUT_DIR   = "plots"
ZIP_NAME     = "plots.zip"
# =======================

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # --- Chrome headless setup ---
    chrome_opts = Options()
    chrome_opts.add_argument("--headless")
    chrome_opts.add_argument("--window-size=1920,1080")
    chrome_opts.add_argument("--disable-gpu")
    chrome_opts.add_argument("--no-sandbox")
    chrome_opts.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_opts
    )
    driver.get(PX4_LOG_URL)

    # wait up to 30s for at least one Plotly plot to appear
    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "js-plotly-plot")))

    plots = driver.find_elements(By.CLASS_NAME, "js-plotly-plot")
    print(f"Found {len(plots)} plots. Capturing…")

    for idx, div in enumerate(plots, start=1):
        # ensure it's in view
        driver.execute_script("arguments[0].scrollIntoView({block:'center'});", div)
        time.sleep(1)  # give it a moment to render
        png_path = os.path.join(OUTPUT_DIR, f"plot_{idx:02d}.png")
        div.screenshot(png_path)
        print(f" → Saved {png_path}")

    driver.quit()

    # zip them up
    with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as zf:
        for fname in sorted(os.listdir(OUTPUT_DIR)):
            zf.write(os.path.join(OUTPUT_DIR, fname), arcname=fname)

    print(f"\nAll done! Archive created: {ZIP_NAME}")

if __name__ == "__main__":
    main()
