## runner 

runner 理解成是一个，能够被驱动，跑起来的一个插件。

gitlab 

stage:
    1: git:
        git check有没有这个仓库，git clone
```js
stages {
    stage('git') {
        sh git clone $GIT_URL
    };

    stage('install') {

    };
}
```
    
    2: install:
        node_modules 

    3: test:
        npm run 
    
    4: build:
        npm build

    5: deploy:
        copy -R xx/dist nginx/dist
        nginx - 


## docker 
```dockerfile
FROM nginx
LABEL name="zhaowa-nginx-website"
LABEL version="1.0.0"
COPY ./build /usr/share/nginx/html
COPY ./react.conf /etc/nginx/conf.d
RUN npm install
EXPOSE 3001
```

运维知识：
- docker -- 容器 -- 极简版的虚拟机
- nginx
- K8S -- docker compose ++;

- CICD；
    - gitlab 代码库
    - jenkins 去帮助你在代码里做一些操作。
