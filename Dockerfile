FROM ruby:3.0.3

WORKDIR /usr/src/memoit

RUN apt-get update -qq && apt-get install -y \
  postgresql-client \
  curl \
  npm

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -y nodejs

COPY Gemfile* package*.json yarn.lock ./

RUN gem install bundler && bundle install

RUN npm install -g yarn && yarn install

COPY . .


EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
