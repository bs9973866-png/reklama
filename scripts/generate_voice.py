#!/usr/bin/env python3
"""Generate the Russian narration locally with the Piper neural voice."""
from pathlib import Path
import subprocess
import wave

TEXT = (
    "Твой Minecraft. Твои правила. Но перед игрой нужно выбрать версию, "
    "подготовить профиль и настроить запуск. REDSHIFT Launcher собирает всё "
    "необходимое в одном месте. Выбирай версию Minecraft — от знакомой классики "
    "до новых релизов. Создавай отдельные профили для выживания, мини-игр и "
    "модовых сборок. Устанавливай нужные моды, переключайся между наборами и "
    "не смешивай настройки разных миров. Подстрой параметры запуска под свой "
    "компьютер, чтобы каждый профиль был готов заранее. Открыл лаунчер, выбрал "
    "сборку, нажал «Играть» — и можно возвращаться в свой мир. Без лишних окон "
    "и постоянной ручной настройки. REDSHIFT Launcher. Собери свой Minecraft. "
    "Запускай по-своему."
)

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "models" / "ru_RU-dmitri-medium.onnx"
OUTPUT = ROOT / "public" / "voice.wav"

def main() -> None:
    if not MODEL.is_file() or not MODEL.with_suffix(".onnx.json").is_file():
        raise FileNotFoundError("Piper voice model or its JSON config is missing.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "piper",
            "--model",
            str(MODEL),
            "--output_file",
            str(OUTPUT),
        ],
        input=TEXT,
        text=True,
        check=True,
        timeout=240,
    )

    if not OUTPUT.is_file() or OUTPUT.stat().st_size < 20_000:
        raise RuntimeError("Piper produced an empty or unexpectedly small voice file.")

    with wave.open(str(OUTPUT), "rb") as audio:
        duration = audio.getnframes() / float(audio.getframerate())
        if duration < 15:
            raise RuntimeError(f"Voiceover is unexpectedly short: {duration:.1f}s")
        print(
            f"Voiceover ready: {duration:.1f}s, "
            f"{audio.getframerate()} Hz, {audio.getnchannels()} channel(s)"
        )

if __name__ == "__main__":
    main()
