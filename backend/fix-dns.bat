@echo off
echo ============================================
echo Fix DNS pour MongoDB Atlas (Hyper-V/WSL)
echo ============================================
echo.
echo IMPORTANT: Clic droit sur ce fichier ^
  "Executer en tant qu'administrateur"
echo.

netsh interface ip set dns "Ethernet 3" static 8.8.8.8 primary
netsh interface ip add dns "Ethernet 3" 8.8.4.4 index=2
netsh interface ip set dns "Wi-Fi 2" static 8.8.8.8 primary
netsh interface ip add dns "Wi-Fi 2" 8.8.4.4 index=2
netsh interface ip set dns "vEthernet (WSL (Hyper-V firewall))" static 8.8.8.8 primary
netsh interface ip add dns "vEthernet (WSL (Hyper-V firewall))" 8.8.4.4 index=2

ipconfig /flushdns

echo.
echo DNS configuré !
echo Redémarre le serveur : npm run dev
pause
