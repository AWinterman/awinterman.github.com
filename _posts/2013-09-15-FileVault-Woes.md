---
layout: post 
title: FileVault Ate My Homework
subtitle: An Extravaganza of Cryptic Errors
---

So yesterday evening I decided to encrypt my the hard drive on my personal computer, a 13 inch
retina macbook pro, using filvault. At first it was all hunkydory-- encrypted,
wrote down the recovery key someplace secure, and continued working away at my
deploy.sh script for my developement environemnt. 

I'd occasionally had to restart (installed Xcode, for one), and each time I was
presented with a snappy login in screen which asked me to decrypt the drive by
entering my password. Then, suddenly, in the middle of puzzling out why the
Comt. At first it was all hunkydory-- encrypted, wrote down the recovery key
someplace secure, and continued working away at my deploy.sh script for my
developement environemnt.  Then, while I was in the middle of trying to figure
out a why installing [Command-T](https://wincent.com/products/command-t) would
polute the current working directory with a bunch of `.o` and `.h` files in
addition to a Makefile, vim suddenly frose, and I was presented with the dread 
"Your computer restared because of a problem" message. I anxiously pressed the
any key to continue, which seemed like it was going okay until the mac just
booted to the [no symbol](http://en.wikipedia.org/wiki/No_symbol) and gear that
spun forever. 

Uh oh!

On goes the software person hat. Luckily I've got my work computer home for the
weekend, so I've been able to poke around on the barren waste of frustration
that is the mac help forums. So far it's been fun.

I booted into recovery mode (hold `ctrl-R` during reboot). Hooray! there's a
diskutility, with my encrypted disk like there. Okay, good, click it. Press
unlock. Enter your password. The machine thinks for a good long while and then
shakes its' head. Wat. And then, following that, the volume is removed from the
sidebar on the left. Weeeeee!

Luckily there's a terminal available in recovery mode, complete with `diskutil`
and `dd`. I reboot to get the machine back into the state it was in before I
started fucking with it, open the terminal and start poking around. After a bit
of snooping, I found a guide to [unlocking a FileValut 2-encrypted boot drive
from the command
line](http://derflounder.wordpress.com/2011/11/23/using-the-command-line-to-unlock-or-decrypt-your-filevault-2-encrypted-boot-drive/).
Perfect! that sounds pretty much like my situation.

The instruction, essentially, is to first `diskutil cs unlockVolume
<logical-volume>` and then `diskutil cs revert <logical volume>`, where
`<logical volume>` is the UUID of the logical volume in question (I aliased it
to the variable `$LV` in bash. Great, but this is the output to the
`unlockVolume` command:

```
-bash-3.2# diskutil cs unlockVolume $LV
Passphrase:
Started CoreStorage operation
Logical Volume successfully unlocked
Logical Volume successfully attached as disk13
Error: -69842: Couldn't mount disk
```

blergh.

At this point I'm just ready to wipe the disk. I don't have anything that
important on here anyway, so who cares. But first breakfast. Updates after
lunch.


