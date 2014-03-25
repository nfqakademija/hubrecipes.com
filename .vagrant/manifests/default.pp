# Ensure the time is accurate, reducing the possibilities of apt repositories
# failing for invalid certificates
include '::ntp'
include git
include composer

#Will be loaded all needed configurations in this variable
if $server_config == undef {
  $server_config = hiera('server', false)
}

exec { "apt-update":
  command => "/usr/bin/apt-get update"
}

Exec["apt-update"] -> Package <| |>

Exec { path => [ '/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/' ] }
File { owner => 0, group => 0, mode => 0644 }

class { "apt": }
apt::source { 'packages.dotdeb.org-php55':
    location          => 'http://packages.dotdeb.org',
    release           => 'wheezy-php55',
    repos             => 'all',
    required_packages => 'debian-keyring debian-archive-keyring',
    key               => '89DF5277',
    key_server        => 'keys.gnupg.net',
    include_src       => true
}

ensure_packages( ['augeas-tools'] )

class { '::mysql::server':
  root_password    => 'root',
}

class { 'php':
  version => 'latest',
  package             => "php5",
  service             => "php5",
  service_autorestart => false,
  require => [
    File['/etc/apt/sources.list.d/packages.dotdeb.org-php55.list'],
    Exec['apt-update']
  ]
}

php::module {
  [
  'cli',
  'mysql',
  'curl',
  'intl',
  'gd',
  'mcrypt',
  'common',
  'xdebug'
  ]:
}

augeas { "php_timezone_cli":
  context => "/files/etc/php5/cli/php.ini",
  changes => "set PHP/date.timezone Europe/Vilnius",
}

augeas { "xdebug":
  context => "/files/etc/php5/mods-available/xdebug.ini",
  changes => [
  "set Extension/zend_extension xdebug.so",
  "set REMOTE/xdebug.default_enable 1",
  "set REMOTE/xdebug.remote_autostart 0",
  "set REMOTE/xdebug.remote_connect_back 1",
  "set REMOTE/xdebug.remote_enable 1",
  "set REMOTE/xdebug.remote_handler dbgp",
  "set REMOTE/xdebug.remote_port 9000"
  ]
}

php::pear::config { auto_discover: value => "1" }

php::pear::module { 'PHPUnit':
  repository  => 'pear.phpunit.de',
  use_package => 'no',
  alldeps => 'true',
}

php::pear::module { 'PHP_CodeSniffer':
  use_package => 'no',
}

class { 'apache':
  package => 'apache2-mpm-prefork'
}
apache::module { 'php5': 
  require => Class["php"]
}
apache::vhost { $vhost_name:
  docroot  => $vhost_path
}

class { 'nodejs':
    version => 'v0.10.26',
    make_install => false,
}

package { 'grunt-cli':provider => npm}
package { 'grunt':provider => npm}
package { 'gulp':provider => npm}
package { 'bower':provider => npm}

package { 'capistrano':
    provider => 'gem',
    ensure => '2.15.4'
}



