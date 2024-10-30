FROM ruby:3.0.3-alpine

WORKDIR /usr/src/memoit

RUN apk update && apk add --no-cache postgresql-client \
    bash \
    build-base \
    libpq-dev \ 
    nodejs \ 
    yarn && \
    rm -rf /var/cache/apk/* /tmp/* 

COPY Gemfile* package.json yarn.lock ./

RUN gem install bundler && bundle install && yarn install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
