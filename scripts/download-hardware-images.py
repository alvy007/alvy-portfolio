from pathlib import Path
import requests

OUTPUT_DIR = Path("public/images/hardware")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Replace these URLs with your selected image direct URLs
HARDWARE_IMAGES = {
    "raspberry-pi.png": "https://www.xda-developers.com/raspberry-pi-5-review/",
    "arduino-uno.png": "https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2024/05/arduino-uno-2.jpg",
    "arduino-nano.png": "https://content.instructables.com/F2I/HE1H/JQMOG9F1/F2IHE1HJQMOG9F1.jpg?width=270&auto=webp",
    "esp32.png": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFLF1tdh8zqlnt_jHjLeFCfCHNbl5vQ_Fsw&s",
    "lora-module.png": "https://upload.wikimedia.org/wikipedia/commons/5/5a/LoRa_Module_with_antenna_and_SPI_wires_attached.jpg",
    "sensors.png": "https://static.cytron.io/image/catalog/products/SN-IR-MOD/5.jpg",
    "motor-driver.png": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7GWil5Vj_NcigawHEt_QJKR8pvhtI59phg&s",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def download_image(filename: str, url: str) -> None:
    if not url or url.startswith("PASTE_"):
        print(f"Skipped {filename}: URL not added yet")
        return

    output_path = OUTPUT_DIR / filename

    try:
        response = requests.get(url, headers=HEADERS, timeout=20)
        response.raise_for_status()

        content_type = response.headers.get("content-type", "")
        if "image" not in content_type:
            print(f"Skipped {filename}: URL did not return an image")
            return

        output_path.write_bytes(response.content)
        print(f"Downloaded: {output_path}")

    except requests.RequestException as error:
        print(f"Failed {filename}: {error}")


def main() -> None:
    for filename, url in HARDWARE_IMAGES.items():
        download_image(filename, url)


if __name__ == "__main__":
    main()