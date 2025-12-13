# EAREC Orçamentos - High-End Proposal System

Bem-vindo ao código-fonte do sistema de orçamentos da EAREC. Este projeto foi desenvolvido com foco em **Experiência do Usuário (UX)**, **Animações Fluidas** e **Design Cinematográfico**.

## 📋 Funcionalidades Principais

1.  **Welcome Screen (Capa):** Coleta dados do cliente (Nome, Local, Data) para personalizar a proposta.
2.  **Orçamento Dinâmico:**
    *   **Configurador:** O cliente escolhe a ocasião (Institucional, Publicidade, etc).
    *   **Localização:** Alterna entre Estúdio (com custo extra) e Externo.
    *   **Quantitativo:** Seleciona quantidade de fotos e vídeos, atualizando o preço em tempo real.
3.  **Moodboard:** Galeria de inspiração visual.
4.  **Assinatura Digital:** O cliente assina a proposta na tela (funciona em Mobile e Desktop).
5.  **Geração de Valor:** Itens inclusos (Roteiro, Equipe) são mostrados como cortesia premium.

---

## 🚀 Como Rodar o Projeto Corretamente

### Pré-requisitos
*   Node.js instalado (versão 18 ou superior recomendada).

### Passo a Passo

1.  **Instale as dependências:**
    Abra o terminal na pasta do projeto e rode:
    ```bash
    npm install
    ```

2.  **Adicione a Logo:**
    *   Crie uma pasta chamada `assets` dentro da pasta `src` (`src/assets`).
    *   Cole sua imagem de logo lá com o nome exato: `logo.png`.

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O terminal mostrará um link (geralmente `http://localhost:5173`). Clique para abrir.

---

## 🛠 Como Personalizar (Guia Rápido)

### 1. Alterar Preços Base
Vá em `src/data/mock.ts`.
*   `basePrice`: Valor inicial da equipe.
*   `studioFee`: Valor adicionado se o cliente escolher "Estúdio".
*   `photoUnitPrice`: Preço de cada foto extra.

### 2. Alterar Cores e Marca
O sistema usa **TailwindCSS**.
*   A cor vermelha principal é definida como `brand-DEFAULT`.
*   Para mudar globalmente, procure e substitua `#DC2626` nos arquivos ou configure no `tailwind.config` (se estivesse separado, mas aqui está injetado no HTML para simplicidade).

### 3. Alterar Textos "Cinematográficos"
*   **Hero (Texto de entrada):** `src/components/quote/Hero.tsx`
*   **Lista de Serviços:** `src/components/quote/UpsellList.tsx`

---

## 🐛 Solução de Problemas Comuns

*   **A assinatura não desenha ou o traço sai longe do dedo:**
    *   Isso acontece se o navegador redimensionar. O código já possui um `resizeObserver`, mas se persistir, recarregue a página.
*   **A imagem da logo não carrega:**
    *   Verifique se o nome do arquivo é exatamente `logo.png` e se está em `src/assets/`.

## 📦 Estrutura de Pastas

*   `src/components`: Blocos visuais (Botões, Listas, Modais).
*   `src/pages`: As telas principais (Welcome e QuoteView).
*   `src/data`: Onde ficam os preços e textos padrão.
*   `src/lib`: Utilitários de animação e formatação de moeda.
