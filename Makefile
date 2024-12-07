STAGING_ENV_FILE ?= .env.staging
PRODUCTION_ENV_FILE ?= .env.production

DOCKER_REGISTRY ?= test
# DOCKER_REGISTRY ?= ghcr.io/GITHUB_LOGIN
IMAGE_NAME ?= recipe-app

# Ensure VERSION is passed for specific environments
# -z string: True if the string is null (an empty string)
check-version:
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is required"; \
		exit 1; \
	fi

# Build for production environment
# .PHONY нужен для предотвращения конфликта команды с одноименными файлами
.PHONY: build-production
build-production: check-version
	@echo "Building Docker image for production: $(IMAGE_NAME):$(VERSION)"
	docker build --platform linux/amd64 --build-arg ENV_FILE=$(PRODUCTION_ENV_FILE) -t "${DOCKER_REGISTRY}/${IMAGE_NAME}:$(VERSION)" .
	docker tag "${DOCKER_REGISTRY}/${IMAGE_NAME}:$(VERSION)" "${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"

# Build and push for staging environment
.PHONY: build-staging
build-staging: check-version
	@echo "Building Docker image for staging: $(IMAGE_NAME):$(VERSION)"
	docker build --platform linux/amd64 --build-arg ENV_FILE=$(STAGING_ENV_FILE) -t "${DOCKER_REGISTRY}/${IMAGE_NAME}:rc-$(VERSION)" .

.PHONY: deploy-local
deploy-local: check-version
	@echo "Deploying local $(IMAGE_NAME):$(VERSION) to port 3000..."
	docker run -p 3000:3000 ${DOCKER_REGISTRY}/$(IMAGE_NAME):rc-$(VERSION)

.PHONY: docker-push
docker-push: check-version
	docker push "${DOCKER_REGISTRY}/${IMAGE_NAME}:$(VERSION)"
	docker push "${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"
