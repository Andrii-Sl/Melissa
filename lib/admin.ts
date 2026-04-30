export const admin = {
  from() {
    return {
      select() {
        return {
          order() {
            return { data: [], error: null };
          }
        };
      },

      insert(data: any) {
        return {
          select() {
            return {
              single() {
                return { data, error: null };
              }
            };
          }
        };
      },

      update() {
        return {
          eq() {
            return { error: null };
          }
        };
      }
    };
  }
};
