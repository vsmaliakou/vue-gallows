import { getRandomName } from "@/api";
import { onMounted, ref } from "vue";

export const useRandomWord = () => {
  const word = ref('');

  const getRandomWord = async () => {
    try {
      const name = await getRandomName();
      word.value = name.toLowerCase();
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    await getRandomWord();
  });

  return {
    word,
    getRandomWord,
  };
};