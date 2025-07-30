param([string]$Msg = "deploy: build $(Get-Date -Format yyyy-MM-dd_HH-mm)")

# 1) Compilar
git -C "think-ticket-widget-bootstrap" checkout main
npm --prefix "think-ticket-widget-bootstrap" run build

# 2) Copiar a deploy
Copy-Item -Path "think-ticket-widget-bootstrap\dist\*" -Destination "deploy" -Recurse -Force

# 3) Commit + push
git -C "deploy" add .
git -C "deploy" commit -m $Msg
git -C "deploy" push origin gh-pages
