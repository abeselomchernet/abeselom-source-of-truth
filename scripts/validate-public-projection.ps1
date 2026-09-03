$ErrorActionPreference = 'Stop'
$projectionPath = Join-Path $PSScriptRoot '..\data\public-projection.json'
$projection = Get-Content -Raw $projectionPath | ConvertFrom-Json

$evidenceById = @{}
foreach ($item in $projection.evidence) {
  if ($evidenceById.ContainsKey($item.id)) { throw "Duplicate evidence ID: $($item.id)" }
  $evidenceById[$item.id] = $item
  foreach ($field in @('id','title','status','label','description','source','url')) {
    if ([string]::IsNullOrWhiteSpace([string]$item.$field)) { throw "Missing $field for $($item.id)" }
  }
  if ([string]$item.url -match '(?i)(C:\\|Users\\|password|secret|token|credential)') { throw "Private value in public URL for $($item.id)" }
}

foreach ($rule in $projection.requirements) {
  foreach ($evidenceId in $rule.evidence) {
    if (-not $evidenceById.ContainsKey($evidenceId)) { throw "Dangling evidence ID: $evidenceId" }
  }
}

if ($projection.certifications.Count -ne 45) { throw "Expected 45 LinkedIn certification records; found $($projection.certifications.Count)" }
foreach ($certification in $projection.certifications) {
  foreach ($field in @('id','name','issuer','issued','verificationUrl')) {
    if ([string]::IsNullOrWhiteSpace([string]$certification.$field)) { throw "Missing $field for $($certification.id)" }
  }
  if ([string]$certification.verificationUrl -notmatch '^https://') { throw "Non-HTTPS verification URL for $($certification.id)" }
}

Write-Output "Public projection valid: $($projection.evidence.Count) evidence records, $($projection.requirements.Count) matcher rules."
