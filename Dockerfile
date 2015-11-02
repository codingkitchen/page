FROM centos:centos6
MAINTAINER Konrad Kühne

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install Node.js and npm
RUN     yum install -y npm git-core wget

# Clone and build project
RUN git clone https://github.com/codingkitchen/page.git /opt/page
RUN cd /opt/page; npm install

EXPOSE 8080

CMD ["node", "/opt/page/index.js"]
