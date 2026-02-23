$content = Get-Content 'App.tsx' -Encoding UTF8
# Lines 550-561 (0-indexed: 549-560) are broken floating WA block - replace them
$fixed = @()
for ($i = 0; $i -lt $content.Length; $i++) {
    if ($i -lt 549 -or $i -gt 560) { $fixed += $content[$i] }
    elseif ($i -eq 549) {
        # Replace broken block with correct JSX
        $fixed += '    </div>'
        $fixed += ''
        $fixed += '      {/* FLOATING WHATSAPP */}'
        $fixed += "      <a href={``https://wa.me/\${CONTACT_INFO.whatsapp}?text=\${encodeURIComponent('Hola Miguel! Me interesa invertir en bienes ra\u00edces en M\u00e9xico.')}``} target=""_blank"" rel=""noopener noreferrer"" className=""fixed bottom-8 right-8 z-[500] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"">"
        $fixed += '        <MessageCircle size={28} className="text-white fill-white"/>'
        $fixed += '      </a>'
        $fixed += '    </div>'
    }
}
$fixed | Set-Content 'App.tsx' -Encoding UTF8
Write-Host "Done. Lines: $($fixed.Length)"
