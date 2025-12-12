# NEOVELOX - Apresentação Executiva

## 📁 Estrutura do Projeto

```
neovelox/
├── index.html              # Página de login/senha
├── apresentacao.html       # Apresentação principal (protegida)
├── README.md               # Este arquivo
│
├── css/
│   ├── variables.css       # Variáveis globais (cores, fontes, espaçamentos)
│   ├── base.css            # Reset, tipografia base, utilitários
│   ├── components.css      # Componentes reutilizáveis (botões, cards, nav)
│   ├── sections.css        # Estilos específicos das seções
│   ├── animations.css      # Keyframes e animações
│   ├── responsive.css      # Media queries
│   └── auth.css            # Estilos da página de login
│
├── js/
│   ├── auth.js             # Sistema de autenticação
│   ├── auth-guard.js       # Proteção de páginas autenticadas
│   ├── navigation.js       # Navegação e scroll
│   └── animations.js       # Animações on scroll
│
└── assets/                 # Imagens e recursos (vazio por enquanto)
```

## 🔐 Sistema de Autenticação

### Senha Padrão
A senha de acesso está configurada em `js/auth.js`:
```javascript
password: 'neovelox2025'
```

### Alterar a Senha
1. Abra o arquivo `js/auth.js`
2. Localize a linha `password: 'neovelox2025'`
3. Substitua `'neovelox2025'` pela nova senha
4. Salve o arquivo

### Configurações Disponíveis
```javascript
config: {
    password: 'neovelox2025',           // Senha de acesso
    redirectTo: 'apresentacao.html',    // Página após login
    storageKey: 'neovelox_auth',        // Chave do sessionStorage
    sessionDuration: 24 * 60 * 60 * 1000, // Duração da sessão (24h)
}
```

## 🎨 Guia de Edições Rápidas

### Alterar Cores
Edite `css/variables.css`:
```css
--primary: #FF3C00;      /* Cor principal (laranja) */
--secondary: #00D4FF;    /* Cor secundária (ciano) */
--accent: #FFB800;       /* Cor de destaque (amarelo) */
```

### Alterar Fontes
Edite `css/variables.css`:
```css
--font-display: 'Orbitron', sans-serif;  /* Títulos */
--font-body: 'Rajdhani', sans-serif;     /* Corpo */
```

### Alterar Conteúdo de Seções
Edite diretamente `apresentacao.html`. Cada seção está claramente marcada:
```html
<!-- ========================================
     SEÇÃO 2: CONCEITO
========================================= -->
```

### Alterar Valores Financeiros
Procure pelos `financial-card` em `apresentacao.html` e edite os valores.

### Adicionar Nova Seção
1. Adicione o botão na navegação:
```html
<button class="nav-btn" data-section="nova-secao">NOVA SEÇÃO</button>
```

2. Adicione o conteúdo da seção:
```html
<section class="section section-dark" id="nova-secao">
    <!-- Conteúdo aqui -->
</section>
```

## 📱 Responsividade

Breakpoints configurados em `css/responsive.css`:
- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px
- **Mobile pequeno:** < 480px

## 🚀 Deploy no Vercel

1. Faça commit de todos os arquivos no GitHub Desktop
2. Conecte o repositório ao Vercel
3. O site será automaticamente deployado

### Variáveis de Ambiente (se necessário)
Não há variáveis de ambiente obrigatórias para este projeto.

## 📝 Arquivos para Edições Comuns

| O que alterar | Arquivo |
|---------------|---------|
| Senha de acesso | `js/auth.js` |
| Cores do site | `css/variables.css` |
| Conteúdo das seções | `apresentacao.html` |
| Valores financeiros | `apresentacao.html` |
| Estilos de componentes | `css/components.css` |
| Animações | `css/animations.css` |
| Comportamento de navegação | `js/navigation.js` |

## 🔧 Manutenção

### Para adicionar imagens 3D:
1. Coloque as imagens na pasta `assets/`
2. Substitua os placeholders em `apresentacao.html`:
```html
<!-- De: -->
<div class="image-placeholder">...</div>

<!-- Para: -->
<img src="assets/nome-da-imagem.jpg" alt="Descrição">
```

### Para adicionar favicon:
1. Coloque o arquivo `favicon.ico` na raiz
2. Adicione no `<head>` de ambos os HTMLs:
```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

---

**Versão:** 1.0  
**Última atualização:** 2025
