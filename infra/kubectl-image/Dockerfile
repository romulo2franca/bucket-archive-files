FROM debian

RUN apt-get update && apt-get install -y gettext-base curl apt-transport-https gnupg

RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
&& echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list \
&& apt-get update && apt-get install -y kubectl \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*