FROM nginx:1.21-alpine

# 复制构建的前端文件到 nginx 容器中
COPY .next/ /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]