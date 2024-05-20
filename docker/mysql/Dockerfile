FROM mysql:8-debian

WORKDIR /var/www

RUN apt-get update && \
apt-get install -y \
sudo \
vim

CMD [ "/bin/bash" ]

# docker起動後「service mysql start」コマンド必要

# ユーザーを作成する際のhostは、アクセスの主体となるホスト(IPアドレス)を指している
# mysql上でユーザーを作る際、hostの箇所は[mysql]で名前解決できず、192.0...のように実際のアドレスを直打ちする必要がある
# mysql上でのユーザーは各ホスト毎に登録して、使い。登録していないホストからはアクセス出来ない仕組み。