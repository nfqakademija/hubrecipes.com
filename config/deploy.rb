# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'hubrecipes'
set :repo_url, 'https://github.com/nfqakademija/hubrecipes.com.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
 set :deploy_to, '/home/hubrecipes/public_html'

 set :deploy_to, '/home/hubrecipes/public_html'
 set :linked_files, %w{app/config/parameters.yml}
 set :linked_dirs, %w{app/logs app/cache vendor}
 set :keep_releases, 5

 namespace :deploy do

   before :publishing, :restart

   before :restart, :clear_cache do
     on roles(:web) do
         execute "cd #{release_path} && composer install"
     end
   end
   after :finishing, 'deploy:cleanup'
 end
