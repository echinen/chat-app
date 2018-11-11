## chat-app (frontend)

### Requisitos de instalação

Primeiramente instale o browsersync globalmente utilizando o comando: 
``` bash
npm install -g browser-sync
```

### Executando o app (frontend)

Para inicar o app vá para a pasta de ./frontend e em seguida execute o comando abaixo:
``` bash
cd frontend/
browser-sync start --config bs-config.js
```

![Executando o app](.readme/1-execute-app.gif)

### Painel admin do Browser-Sync

Abrindo o painel admin.

![Admin panel](.readme/2-open-admin.gif)


Habilitando novas abas para novos usuários.

![New Tab](.readme/3-open-new-tab.gif)


### Funcionalidades do app

Criando um usuário para uma determinada sala.

![User Chat Room](.readme/4-create-user.gif)

Novo usuário para uma determinada sala.

![New User Chat Room](.readme/5-new-user.gif)

Usuário saindo e calculando tempo de permanência na sala.

![User Left Chat Room](.readme/6-left-user-talk-time.gif)

Compartilhando localização.

![Share Location Chat Room](.readme/7-share-location.gif)