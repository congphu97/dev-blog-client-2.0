/**
 * Hàm so sánh equal dùng cho Angular Signal/Computed để so sánh mảng Object
 * Trả về true nếu danh sách key (mặc định là 'id') giữa mảng cũ và mới y hệt nhau.
 */
export function arrayEqualByKey<T>(key: keyof T = 'id' as keyof T) {
  return (prev: T[], curr: T[]): boolean => {
    // 1. Cùng tham chiếu thì chắc chắn giống nhau
    if (prev === curr) return true;

    // 2. Độ dài khác nhau thì chắc chắn đã thay đổi
    if (prev.length !== curr.length) return false;

    // 3. So sánh từng phần tử theo key
    return prev.every((item, index) => item[key] === curr[index][key]);
  };
}
