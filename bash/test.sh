#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
#tar zcvf dist.tar.gz dist
scp dist.tar.gz root@47.103.144.179:/usr/local/nginx/html
ssh root@47.103.144.179 "rm -rf /usr/local/nginx/html/code/* && tar -zxvf /usr/local/nginx/html/dist.tar.gz -C /usr/local/nginx/html/code/ && mv /usr/local/nginx/html/code/dist/* -t /usr/local/nginx/html/code/ && rm -rf /usr/local/nginx/html/code/dist /usr/local/nginx/html/dist.tar.gz"
#
#47.103.144.179
#!pOG0U#83$%%ox
