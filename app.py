# app.py
import streamlit as st
import os
import tempfile
import subprocess
from pytube import YouTube
import whisper

st.title("Extrator de Legendas 🎬➡️📝")

opcao = st.radio("Selecione a fonte do vídeo:", ["Arquivo do dispositivo", "Link do YouTube"])

video_path = None

if opcao == "Arquivo do dispositivo":
    arquivo = st.file_uploader("Envie o vídeo", type=["mp4", "mov", "avi", "mkv"])
    if arquivo is not None:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            tmp.write(arquivo.read())
            video_path = tmp.name

elif opcao == "Link do YouTube":
    link = st.text_input("Cole o link do YouTube")
    if link:
        yt = YouTube(link)
        st.write(f"Baixando: {yt.title}")
        stream = yt.streams.filter(only_audio=True).first()
        out_file = stream.download(output_path=tempfile.gettempdir())
        video_path = out_file

if video_path:
    st.success("Vídeo pronto para transcrição!")

    if st.button("Extrair texto"):
        st.info("Transcrevendo... isso pode levar alguns minutos ⏳")
        
        # Carregar modelo Whisper (pode ser "base", "small", "medium", "large")
        model = whisper.load_model("base")
        result = model.transcribe(video_path, language="pt")

        texto = result["text"]

        st.text_area("Legenda extraída:", texto, height=300)
        
        st.download_button("Baixar como TXT", data=texto, file_name="legenda.txt")
