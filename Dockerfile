# Usar imagem base do Python
FROM python:3.9

# Definir diretório de trabalho
WORKDIR /app

# Copiar requirements
COPY requirements.txt .

# Instalar dependências
RUN pip install -r requirements.txt

# Copiar código
COPY . .

# Expor porta
EXPOSE 8000

# Comando de inicialização
CMD ["gunicorn", "orcamentofacil.wsgi:application", "--bind", "0.0.0.0:8000"]
