# Security-Guidance-Prototype

## framework
Backend - Gin framework
Frontend - HTML + CSS + JS

## Interfaces
Compare: Users are encouraged to input their company information, and upload the baseline and target config files to compare
Analyze: Users are encouraged to input their authentication methods, device encryption choice, company inforamtion and config file, then they can get a detailed assess report with quantifying productivity cost
docs: Users can find README and related experiment data

## Example

| Example Configuration file         | Password length     | Required Special Characters | Maximum Failed Attempts| 
|------------------------------------|---------------------|-----------------------------|------------------------|
| test815                            |16                   |3                            |4|
| test823                            |10|1|3|
| test905                            |12|0|5|
| test0906                           |8|0|5|

All of password policy configuration files are exported from Apple Configurator or iMazing Profile Editor.
They could be used to test Compare and Analyze interfaces.

## Instructions
1. Install golang and gin
2. Run go run main.go in terminal
3. Open localhost:8080