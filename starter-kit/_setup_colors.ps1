param([string]$hex)

# Compute 4 brand colors from 1 hex input
$hex = $hex -replace '#', ''
if ($hex.Length -ne 6) { Write-Host "$('#'+$hex)|$('#'+$hex)|$('#'+$hex)|$('#'+$hex)"; exit }

$r = [Convert]::ToInt32($hex.Substring(0,2),16)/255
$g = [Convert]::ToInt32($hex.Substring(2,2),16)/255
$b = [Convert]::ToInt32($hex.Substring(4,2),16)/255

$max = [Math]::Max($r,[Math]::Max($g,$b))
$min = [Math]::Min($r,[Math]::Min($g,$b))
$l = ($max+$min)/2

if ($max -eq $min) {
    $h = 0; $s = 0
} else {
    $s = if ($l -lt 0.5) { ($max-$min)/(2*$l) } else { ($max-$min)/(2-2*$l) }
    if ($max -eq $r)      { $h = (($g-$b)/($max-$min)) % 6 }
    elseif ($max -eq $g)  { $h = (($b-$r)/($max-$min)) + 2 }
    else                  { $h = (($r-$g)/($max-$min)) + 4 }
    $h = $h * 60
    if ($h -lt 0) { $h += 360 }
}

function hsl2hex($h, $s, $l) {
    $c = (1 - [Math]::Abs(2*$l - 1)) * $s
    $x = $c * (1 - [Math]::Abs(($h/60) % 2 - 1))
    $m = $l - $c/2
    switch ([Math]::Floor($h/60)) {
        0 { $ri=$c; $gi=$x; $bi=0 }
        1 { $ri=$x; $gi=$c; $bi=0 }
        2 { $ri=0;  $gi=$c; $bi=$x }
        3 { $ri=0;  $gi=$x; $bi=$c }
        4 { $ri=$x; $gi=0;  $bi=$c }
        5 { $ri=$c; $gi=0;  $bi=$x }
        default { $ri=0; $gi=0; $bi=0 }
    }
    '#{0:X2}{1:X2}{2:X2}' -f [int](($ri+$m)*255), [int](($gi+$m)*255), [int](($bi+$m)*255)
}

$primary = '#' + $hex
$dark    = hsl2hex $h ($s * 0.9) ([Math]::Max(0, $l - 0.18))
$light   = hsl2hex $h ($s * 0.5) ([Math]::Min(0.92, $l + 0.28))
$accent  = hsl2hex (($h + 210) % 360) $s $l

Write-Host "$primary|$dark|$light|$accent"
