# -------------------------------------------------------
# 開発
# -------------------------------------------------------
.PHONY: initial-setup
initial-setup:
	@echo "=====Create certificates====="
	mkcert -install
	mkcert -key-file docker/nginx/certs/key.pem -cert-file docker/nginx/certs/cert.pem localhost 127.0.0.1 'www.local.virtual-soundbox.jp' 'api.local.virtual-soundbox.jp'
	@echo "=====Build docker====="
	docker compose build
	docker compose run --rm php composer install
	docker compose run --rm php php artisan migrate
	@echo "=====Initial setup is done. Please reboot if you need.====="
