# -------------------------------------------------------
# 開発
# -------------------------------------------------------
.PHONY: initial-setup
initial-setup:
	@echo "=====Create certificates====="
	mkcert -install
	mkcert -key-file docker/nginx/certs/key.pem -cert-file docker/nginx/certs/cert.pem localhost 127.0.0.1 'www.virtual-soundbox.jp'
	@echo "=====Create Java Keystore====="
	openssl pkcs12 -export -in docker/nginx/certs/cert.pem -inkey docker/nginx/certs/key.pem -out keystore.p12 -passout pass:password
	keytool -importkeystore -srckeystore keystore.p12 -srcstoretype PKCS12 -srcstorepass password -destkeystore backend/keystore.jks -deststoretype JKS -deststorepass password -destkeypass password
	rm -f keystore.p12
	@echo "=====Build docker====="
	docker compose build
	@echo "=====Initial setup is done. Please reboot if you need.====="
