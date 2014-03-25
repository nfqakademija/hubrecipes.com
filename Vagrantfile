# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "wheezy"
  config.vm.network :private_network, ip: "192.168.63.29"
  config.ssh.forward_agent = true
  config.vm.provider :virtualbox do |v|
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--memory", 1024]
    v.customize ["setextradata", :id, "--VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end
  config.vm.hostname = "hubrecipes.dev"
  sync_type = Vagrant::Util::Platform.windows? == true ? "smb" : "nfs"
  config.vm.synced_folder "./", "/var/www", id: "vagrant-root" , :type => sync_type
  config.vm.provision :shell, :inline =>"sudo apt-get update"
  config.vm.provision :shell, :path => ".vagrant/install.sh"
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = ".vagrant/manifests"
    puppet.options = ["--verbose", "--debug", "--hiera_config /vagrant/hiera.yaml", "--parser future"]
    puppet.facter = {
        "ssh_username" => "vagrant",
        "vhost_name" => config.vm.hostname,
        "vhost_path" => "/var/www/web"
        }
  end
  config.ssh.shell = "bash -l"
  config.ssh.keep_alive = true
  config.ssh.forward_agent = false
  config.ssh.forward_x11 = false
  config.vagrant.host = :detect
end
