#!/bin/bash
PUPPET_DIR=/etc/puppet/
$(which git > /dev/null 2>&1)
FOUND_GIT=$?
if [[ ! -d "$PUPPET_DIR" ]]; then
    mkdir -p "$PUPPET_DIR"
    echo "Created directory ~/.puppet"
fi
if [ "$FOUND_GIT" -ne '0' ]; then
    echo 'Installing git'
    apt-get -q -y install git-core >/dev/null
    echo 'Finished installing git'
fi
cp -rf "/vagrant/.vagrant/Puppetfile" "$PUPPET_DIR"
echo "Copied Puppetfile"
if [[ ! -f "${PUPPET_DIR}required-packages-installed" ]]; then
    echo 'Installing base packages for librarian'
    apt-get install -y build-essential ruby-dev >/dev/null
    echo 'Finished installing base packages for librarian'
    touch "${PUPPET_DIR}required-packages-installed"
fi
if [[ ! -f "${PUPPET_DIR}librarian-puppet-installed" ]]; then
    echo 'Installing librarian-puppet'
    gem install librarian-puppet >/dev/null
    echo 'Finished installing librarian-puppet'
    echo 'Running initial librarian-puppet'
    cd "$PUPPET_DIR" && librarian-puppet install --clean >/dev/null
    echo 'Finished running initial librarian-puppet'
    touch "${PUPPET_DIR}librarian-puppet-installed"
else
    echo 'Running update librarian-puppet'
    cd "$PUPPET_DIR" && librarian-puppet update >/dev/null
    echo 'Finished running update librarian-puppet'
fi
