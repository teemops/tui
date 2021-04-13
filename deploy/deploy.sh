#!/bin/bash
#use arguments as follows: 1=customer
ansible-playbook -i hosts deploy.yml -e "customer=scg ansible_python_interpreter=/usr/local/bin/python3"
