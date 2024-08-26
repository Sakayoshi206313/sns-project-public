FROM php:8.2.9-fpm-bullseye as base

WORKDIR /var/www/html

RUN set -ex; \
  \
  apt-get update; \
  apt-get install -y \
  libzip-dev \
  libicu-dev \
  libpng-dev \
  libxml2-dev \
  zlib1g-dev \
  libpq-dev \
  unzip \
  nginx \
  supervisor \
  ; \
  rm -rf /var/lib/apt/lists/*;

RUN docker-php-ext-install gd opcache intl soap zip pdo_pgsql bcmath

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

COPY ./config/nginx.conf /etc/nginx/sites-available/default
COPY ./config/php.ini /usr/local/etc/php/php.ini
COPY ./config/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY ./config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./config/server_tokens.conf /etc/nginx/conf.d/server_tokens.conf

FROM base as deploy

COPY ./app /var/www/html

RUN set -ex; \
  apt-get update; \
  apt-get dist-upgrade -y

RUN cd /var/www/html && \
  COMPOSER_MEMORY_LIMIT=-1 composer dump-autoload --no-scripts && \
  COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader

RUN mkdir -p /var/www/html/storage/app/public && \
  mkdir -p /var/www/html/storage/framework/cache && \
  mkdir -p /var/www/html/storage/framework/sessions && \
  mkdir -p /var/www/html/storage/framework/testing && \
  mkdir -p /var/www/html/storage/framework/views

RUN chown -R www-data:www-data /var/www/ && \
    chown -R www-data:www-data /var/run/ && \
    chown -R www-data:www-data /var/log/ && \
    chown -R www-data:www-data /var/lib/nginx

USER www-data

CMD php artisan migrate --force && \
  /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf &&  \
  php artisan route:clear &&  \
  php artisan config:clear &&  \
  php artisan view:clear
