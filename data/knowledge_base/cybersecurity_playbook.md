# Cybersecurity Investigation Playbook

## DDoS
Validate abnormal traffic volume and affected services. Review source distribution, destination ports, timing, and service impact. Coordinate upstream filtering or mitigation according to the organization's incident plan.

## PortScan
Identify source and destination systems. Compare activity with authorized scanning. Review exposed services and investigate repeated or broad scans.

## DoS
Correlate flow-level activity with service availability and server logs. Preserve relevant evidence and investigate the source and target pattern.

## Web Attack
Review web-server and application logs, suspicious parameters, authentication events, and application-layer controls. Validate whether the traffic matches known testing or scanning.

## Infiltration
Investigate endpoint and authentication telemetry, possible lateral movement, and persistence indicators. Follow the organization's containment and evidence-preservation procedures.

## Important
Automated classification is decision support. A prediction should be validated against operational context and additional telemetry before an incident is declared.
