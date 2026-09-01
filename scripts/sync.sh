#!/bin/bash
rsync -av -e ssh public_html/ admin@server:/var/www/patrickzempel
