# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'hubrecipes'
set :repo_url, 'https://github.com/nfqakademija/hubrecipes.com.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
 set :deploy_to, '/home/hubrecipes/public_html'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{app/config/parameters.yml}

# Default value for linked_dirs is []
set :linked_dirs, %w{app/logs app/cache vendor}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  before :publishing, :restart

  before :restart, :clear_cache do
    on roles(:web) do
        execute "cd #{release_path} && composer.phar install"
        execute "cd #{release_path} && php app/console doctrine:schema:create --force"
        execute "cd #{release_path} && php app/console cache:clear"
        execute "cd #{release_path} && npm install"
        execute "cd #{release_path} && bower install"
        execute "cd #{release_path} && gulp init"
        execute "cd #{release_path} && gulp"
    end
  end
  after :finishing, 'deploy:cleanup'
end
