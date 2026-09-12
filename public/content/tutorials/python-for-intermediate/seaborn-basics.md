# Seaborn Basics for Statistical Visualization in Python

While Matplotlib provides fine-grained, low-level control over every pixel on the canvas, writing complex statistical visualizations with it often requires considerable boilerplate code. **Seaborn** is a high-level statistical data visualization library built directly on top of Matplotlib that integrates seamlessly with Pandas DataFrames and provides stunning visual defaults out of the box.

---

## 1. Why Seaborn?

| Dimension | Matplotlib | Seaborn |
| :--- | :--- | :--- |
| **Abstraction Level** | Low-level building blocks | High-level statistical abstractions |
| **Visual Aesthetics** | Barebones defaults; requires manual styling | Contemporary, publication-ready styling by default |
| **Statistical Computations** | Manual calculation of distributions, errors | Built-in aggregation, regression, KDE, and confidence intervals |
| **Integration** | Standard Python lists, NumPy arrays | Native integration with Pandas DataFrames |

---

## 2. Installing and Setting Themes

```bash
python -m pip install seaborn
```

Activate a global Seaborn theme in one call:

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Activate Seaborn's clean aesthetics
sns.set_theme(style="whitegrid", palette="deep")
```

Available theme styles: `"whitegrid"`, `"darkgrid"`, `"white"`, `"dark"`, and `"ticks"`.

---

## 3. Semantic Color Mapping with `scatterplot`

Seaborn allows mapping categorical and continuous dimensions directly to visual semantics like `hue`, `size`, and `style`:

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 5))

# One function call handles 4 dimensions of data!
sns.scatterplot(
    data=tips,
    x="total_bill",
    y="tip",
    hue="time",       # Color mapped by Lunch vs Dinner
    style="smoker",   # Marker style mapped by Smoker status
    size="size",      # Point size mapped by party size
    palette="Set2",
    ax=ax
)

ax.set_title("Tip Amount vs Total Bill by Dining Parameters")
plt.show()
```

---

## 4. Distribution and Categorical Plots

### 1. Histograms with Kernel Density Estimates (`histplot`)
Visualizes frequency distributions alongside a smoothed density curve:

```python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(7, 4))
sns.histplot(tips["total_bill"], kde=True, color="#4f46e5", bins=20, ax=ax)
ax.set_title("Total Bill Distribution & Density")
plt.show()
```

### 2. Box Plots and Violin Plots (`boxplot` & `violinplot`)
Reveals quartiles, median, and outliers across categories:

```python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4.5))

# Box Plot
sns.boxplot(data=tips, x="day", y="total_bill", palette="pastel", ax=ax1)
ax1.set_title("Bill Spread by Day (Box Plot)")

# Violin Plot (Shows kernel density shape of distribution)
sns.violinplot(data=tips, x="day", y="total_bill", palette="muted", ax=ax2)
ax2.set_title("Bill Density Spread (Violin Plot)")

plt.tight_layout()
plt.show()
```

---

## 5. Correlation Heatmaps (`heatmap`)

Heatmaps are the premier choice for visualizing cross-correlation matrices in tabular datasets:

```python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

# Compute numeric correlation matrix
numeric_cols = tips.select_dtypes(include="number")
corr_matrix = numeric_cols.corr()

fig, ax = plt.subplots(figsize=(6, 4.5))

sns.heatmap(
    corr_matrix, 
    annot=True,          # Displays numeric coefficient values inside cells
    cmap="coolwarm",     # Color map diverging from blue (cold) to red (warm)
    fmt=".2f",          # 2 decimal places
    linewidths=0.5,
    ax=ax
)

ax.set_title("Feature Correlation Matrix")
plt.show()
```

---

## 6. Seamless Matplotlib Interoperability

Because Seaborn runs directly on top of Matplotlib, every Seaborn plot function accepts an optional `ax=...` argument. You can mix and match Matplotlib adjustments (spines, titles, secondary lines) with Seaborn plots effortlessly!

---

# Multiple Choice Questions

### 1. What underlying Python library is Seaborn built on top of?
A. NumPy
B. PyTorch
C. Matplotlib
D. Django
**Answer:** C
**Explanation:** Seaborn is built directly on top of Matplotlib, extending its capabilities with statistical plotting and polished defaults.
---

### 2. Which Seaborn parameter maps a categorical column to distinct colors automatically?
A. `color_column`
B. `hue`
C. `tint`
D. `shade`
**Answer:** B
**Explanation:** The `hue` argument groups data points and applies distinct colors according to the specified column's values.
---

### 3. Which chart type displays the correlation coefficients between multiple numeric variables as a color-coded grid?
A. `sns.lineplot()`
B. `sns.scatterplot()`
C. `sns.heatmap()`
D. `sns.rugplot()`
**Answer:** C
**Explanation:** `sns.heatmap()` visualizes matrix data, such as correlation matrices, using a color gradient.
---

### 4. What does setting `kde=True` do in `sns.histplot()`?
A. Sorts the data alphabetically
B. Overlays a smooth Kernel Density Estimate curve over the histogram bars
C. Converts all values to percentages
D. Drops missing values
**Answer:** B
**Explanation:** `kde=True` calculates and renders a smooth continuous probability density curve over the discrete histogram bins.
---

### 5. How can you integrate a Seaborn plot into a specific subplot within a multi-panel Matplotlib grid?
A. By passing `ax=my_axis` into the Seaborn plotting function
B. By calling `sns.embed(my_axis)`
C. Seaborn cannot be used with subplots
D. By calling `plt.merge()`
**Answer:** A
**Explanation:** All Seaborn plotting functions accept an `ax` parameter specifying the exact Matplotlib `Axes` on which to draw.
---
