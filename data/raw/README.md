# CIC-IDS2017 Dataset Directory

This folder is intended for raw network flow CSV files from the [CIC-IDS2017](https://www.unb.ca/cic/datasets/ids-2017.html) dataset (Canadian Institute for Cybersecurity).

## Important Notice

The full CIC-IDS2017 raw CSV dataset is ~800MB in total, with multiple individual files exceeding 100MB (e.g., `Wednesday-workingHours.pcap_ISCX.csv` is ~215MB, `Monday-WorkingHours.pcap_ISCX.csv` is ~169MB).

Because **GitHub enforces a strict 100MB limit per file**, all `*.csv` files in this directory are excluded from Git version control via `.gitignore`.

## Running Without Full Raw CSVs

You **do not** need to download the ~800MB dataset to run or test this application:
1. Pre-trained model artifacts are included in [`backend/models/`](file:///c:/Users/B.Praneeth/Desktop/rag-cybersecurity-assistant-complete/backend/models/):
   - `cybersecurity_model.joblib` (Random Forest classifier)
   - `preprocessor.joblib` (StandardScaler + SimpleImputer pipeline)
   - `label_encoder.joblib` (Multi-class attack labels)
2. Realistic network-flow test vectors for `DDoS`, `PortScan`, and `BENIGN` are included in [`data/demo_samples.json`](file:///c:/Users/B.Praneeth/Desktop/rag-cybersecurity-assistant-complete/data/demo_samples.json).
3. The RAG knowledge base notes are included in [`data/knowledge_base/`](file:///c:/Users/B.Praneeth/Desktop/rag-cybersecurity-assistant-complete/data/knowledge_base/).

## Downloading Full Dataset (For Model Retraining)

If you want to reproduce the notebooks or retrain the model:
1. Download `MachineLearningCSV.zip` from the [official UNB CIC-IDS2017 repository](https://www.unb.ca/cic/datasets/ids-2017.html) or [Kaggle CIC-IDS2017 dataset](https://www.kaggle.com/datasets/cicdataset/cicids2017).
2. Extract the files into `data/raw/MachineLearningCVE/`.
3. Expected files:
   - `Monday-WorkingHours.pcap_ISCX.csv`
   - `Tuesday-WorkingHours.pcap_ISCX.csv`
   - `Wednesday-workingHours.pcap_ISCX.csv`
   - `Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv`
   - `Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv`
   - `Friday-WorkingHours-Morning.pcap_ISCX.csv`
   - `Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv`
   - `Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv`
4. Run the exploration and training notebooks in [`notebooks/`](file:///c:/Users/B.Praneeth/Desktop/rag-cybersecurity-assistant-complete/notebooks/).
