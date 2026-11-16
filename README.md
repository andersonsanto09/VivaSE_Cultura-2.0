# VivaSE Cultura 2.0

Nova versão do guia cultural e mapa do FASC, planejada para o ideathon de 19 a 21/11/2026. Repositório: [VivaSE_Cultura-2.0](https://github.com/bernas0610/VivaSE_Cultura-2.0).

**Estado atual:** Fase 1 documentada para revisão. A pasta `src` foi perdida e ainda não foi reconstruída; os comandos de execução descritos no guia antigo abaixo só funcionarão após a fundação técnica. A direção visual será discutida antes das telas.

[Documentação da Fase 1](docs/README.md) · [Matriz CSD em PDF](output/pdf/VivaSE-Matriz-CSD.pdf) · [Fontes e curadoria](docs/FONTES-E-CURADORIA.md)

Escopo confirmado: FASC 2026, todos os espaços levantados pela pesquisa, mapa, localização, programação, detalhes, roteiros, memórias no próprio navegador e linha do tempo. Trajetos em aplicativo externo; administração adiada. A pesquisa completa de conteúdo e a implementação ainda estão pendentes.

## Referência da versão anterior

O texto a seguir foi preservado do repositório original como referência histórica de proposta e instalação.

# 🗺️ Mapa Vivo do FASC

Mapa interativo e histórico do Festival de Artes de São Cristóvão (FASC), unindo tecnologia, memória coletiva e patrimônio cultural sergipano.

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado no computador:

### 1. Node.js
Baixe e instale:

https://nodejs.org/

Para verificar se instalou corretamente, abra o terminal e digite:

```bash
node -v
npm -v
```

Se aparecer um número de versão, está tudo certo.

---

## 🚀 Como baixar e rodar o projeto

### 1. Baixar o projeto

Clique no botão verde:

```text
Code → Download ZIP
```

ou clone pelo Git:

```bash
git clone URL_DO_REPOSITORIO
```

---

### 2. Abrir a pasta do projeto

Extraia o `.zip` (se baixou) e abra a pasta no VS Code.

---

### 3. Instalar as dependências

No terminal, dentro da pasta do projeto, rode:

```bash
npm install
```

Esse comando irá baixar automaticamente todas as bibliotecas necessárias e criar a pasta:

```text
node_modules/
```

---

### 4. Rodar o projeto

Se o projeto usa **Vite**, execute:

```bash
npm run dev
```

Se o projeto usa **Create React App**, execute:

```bash
npm start
```

---

### 5. Abrir no navegador

Após iniciar, aparecerá algo parecido com:

```text
Local: http://localhost:5173/
```

ou

```text
Local: http://localhost:3000/
```

Abra esse endereço no navegador.

---

## 📁 Estrutura do projeto

```text
src/            # Código principal
public/         # Arquivos públicos
package.json    # Dependências e scripts
README.md       # Instruções
```

---

## ⚠️ Importante

A pasta abaixo **não vem no GitHub**, e isso é normal:

```text
node_modules/
```

Ela é recriada automaticamente com:

```bash
npm install
```

---

## 🛠️ Tecnologias usadas

- React
- Leaflet
- OpenStreetMap
- JavaScript
- CSS

---

## 🎭 Sobre o projeto

O **Mapa Vivo do FASC** é uma plataforma digital que permite explorar o Festival de Artes de São Cristóvão através de:

- mapa interativo;
- memória histórica;
- depoimentos e lembranças;
- comparação entre edições;
- valorização do patrimônio cultural sergipano.

---

## ❤️ Sergipe vive aqui

Tecnologia a serviço da cultura e da memória.
