#!/usr/bin/python3
#make sure RPi.GPIO is install with sudo pip3 install --upgrade RPi.GPIO
#Written by William Harrison Lane III harrisonwd.com
import RPi.GPIO as GPIO
import sys
if(len(sys.argv) == 1 or len(sys.argv) == 2 or len(sys.argv) > 3):
	print("Please enter the arguments, pinset structure is \n pinset on | off PinNumber\n example pinset on 18")
	exit()
arg1 = str(sys.argv[1])  # on or off
arg2 = sys.argv[2]  # pin numbers
if(arg2.isnumeric()):
	arg2 = int(arg2)
	if(arg2 >= 0 and arg2 < 27):
		if(arg1 == "on"):
			print("Pin", str(arg2) , "has been turned", arg1 + ".")
			GPIO.setmode(GPIO.BCM)
			GPIO.setwarnings(False)
			GPIO.setup(arg2,GPIO.OUT)
			GPIO.output(arg2,GPIO.HIGH)
		elif(arg1 == "off"):
			GPIO.setmode(GPIO.BCM)
			GPIO.setwarnings(False)
			GPIO.setup(arg2,GPIO.OUT)
			GPIO.output(arg2,GPIO.LOW)
			print("Pin", str(arg2) , "has been turned", arg1 + ".")
		else:
			print("Please enter a valid instruction.")
	else:
		print("That number is out of range.")
else:
	print("Pin number is invalid.")
exit()

