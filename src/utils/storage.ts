const STORAGE_KEY = 'markflow-lite-content'

export function saveContent(content: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, content)
  } catch (error) {
    console.error('保存内容失败:', error)
  }
}

export function loadContent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.error('加载内容失败:', error)
    return null
  }
}

export function clearContent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('清除内容失败:', error)
  }
}