import numpy as np
import pandas as pd

def clean_input(data):
    df = pd.DataFrame([data])
    df.columns = df.columns.astype(str).str.strip()
    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    return df
