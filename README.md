# English Momentum

Plataforma estática de estudo intensivo de inglês profissional:

- 16 semanas centrais em dois blocos de 8 semanas;
- 112 sessões de 2h30 e 1.120 itens lexicais;
- vocabulário com termômetro de domínio e sugestão de substituição;
- revisão espaçada D+1, D+3, D+7, D+14 e D+30;
- gramática para fala, escrita, avaliações e registro de erros;
- memória local, backup JSON e sincronização opcional com Google Sheets;
- funcionamento responsivo e offline após o primeiro acesso.

## Executar localmente

Sirva este diretório por HTTP e abra `index.html`. Exemplo com Python:

```bash
python3 -m http.server 8080 --directory ingles
```

Depois acesse `http://localhost:8080`.

## Publicar no GitHub Pages

Envie o conteúdo deste diretório para o repositório e ative **Settings → Pages → Deploy from a branch**. Não é necessário processo de build.

## Google Sheets

Siga as instruções em `google-apps-script/README.md`. A URL do Web App é informada pela própria tela **Dados e sincronização** e fica salva apenas no navegador.
