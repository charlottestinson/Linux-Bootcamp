# from the template file /lusr/share/udb/pub/dotfiles/login
#
# This file is read and executed by the C shell (csh) most times you log in.
# It is not read when you sign on thru xdm.
#

# Get the system wide default PATH.  
# It provides access to software you need.  It differs from one
# platform to another.  The department staff maintains it as a
# basic part of your working environment.  We will be very reluctant
# to bail you out if you ignore this warning and munge your PATH.
# !! DO NOT REMOVE THIS BLOCK !!
if (-f /lusr/lib/misc/path.csh) then
	source /lusr/lib/misc/path.csh
endif
# !! DO NOT REMOVE THIS BLOCK !! 


# Okay, now modify PATH.
# To tailor your PATH, append or prepend directories to the
# default PATH in a colon-separated list and remove the "#" comment
# marker at the start of the line.  
# !! DO NOT replace the value of PATH !!
#setenv PATH ${HOME}/bin:${PATH}:/some/other/dir

# Check your quota.
# Most user accounts have a quota.  This script will report to you how
# much disk space you're using and what your quota is set to.  It will
# alert you if you are close to or over your quota.
chkquota

# Set a default printer for lpr and other print commands.
# To change to your favorite replace "lw303" with the printer you use
# most often and remove the "#" comment marker at the start of the setenv line.  
# If $PRINTER is not set, you have to tell lpr which printer to use with
# the -P option.  See 'man printers' for more info.
#setenv PRINTER "lw303"

setenv MAIL ${HOME}/mailbox
set mail = (120 ${MAIL})

# Let various programs, such as vnews, know what editor and mailer you use.
setenv EDITOR vi
setenv VISUAL vi

umask 077

# Set the shell prompt.
set prompt="`uname -n`% "

# Print a pithy saying.
#/usr/games/fortune &

