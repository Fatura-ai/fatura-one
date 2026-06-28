# Convert USER_GUIDE.md to PDF using PowerShell and wkhtmltopdf
# Prerequisite: wkhtmltopdf installed and in PATH

$md = "USER_GUIDE.md"
$html = "USER_GUIDE.html"
$pdf = "USER_GUIDE.pdf"

# Convert Markdown to HTML
$content = Get-Content $md -Raw
$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Postara User Guide</title>
<style>
body { font-family: Arial, sans-serif; margin: 40px; }
h1, h2, h3 { color: #1a202c; }
pre { background: #f7fafc; padding: 10px; }
</style>
</head>
<body>
$content
</body>
</html>
"@

Set-Content -Path $html -Value $htmlContent -Encoding UTF8

# Export to PDF
wkhtmltopdf $html $pdf
Write-Host "Export complete: $pdf"
