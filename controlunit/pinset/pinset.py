#!/usr/bin/python3
import RPi.GPIO as GPIO
import time
import sys
arg1 = str(sys.argv[1])#on or off
arg2 = sys.argv[2]#pin numbers
if(arg2.isnumeric()):
    arg2 = int(arg2)
    if(arg1 == "on"):
        #////on
    elif(arg1 == "off"):
        #////off

    else:
        print("Please enter a valid instruction.") 
else:
	print("Pin number is invalid.")
exit()