import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import API from "@/api/axios";
import toast from "vue3-hot-toast";
import succesS from "../../public/sounds/applepay.mp3"
import errorS from "../../public/sounds/discord-notification.mp3"

const succesSound = new Audio(succesS);
const errorSound = new Audio(errorS);

const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

const postStudent = async (payload) => {
  if (
    !payload.name ||
    !payload.phone ||
    !payload.email ||
    !payload.enrollmentDate ||
    payload.courseIds.length === 0
  ) {
    throw new Error("Maydonlarni to'ldirish talab qilinadi!");
  }
  const response = await API.post("/students", payload);
  return response.data;
};

const putStudent = async (payload) => {
  if (
    !payload.id ||
    !payload.name ||
    !payload.phone ||
    !payload.email ||
    !payload.enrollmentDate ||
    payload.courseIds.length === 0
  ) {
    throw new Error("Maydonlarni to'ldirish talab qilinadi!");
  }

  const mainPayLoad = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    enrollmentDate: payload.enrollmentDate,
    courseIds: payload.courseIds,
  };

  const response = await API.put(`/students/${payload.id}`, mainPayLoad);
  return response.data;
};

const deleteStudent = async (id) => {
  if (!id) throw new Error("Id talab qilinadi!");
  const response = await API.delete(`/students/${id}`);
  return response.data;
};

const useStudents = () => {
  const queryClient = useQueryClient();

  const GetStudents = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const PostStudent = useMutation({
    mutationFn: postStudent,
    onMutate: () => {
      toast.loading("Student qo'shilmoqda...", { id: "postStudent" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student qo'shildi!", { id: "postStudent" });
      succesSound.play();
    },
    onError: (err) => {
      console.error("PostStudent error:", err);
      toast.error(err.message || "Student qo'shishda xatolik!", {
        id: "postStudent",
      });
      errorSound.play();
    },
  });

  const PutStudent = useMutation({
    mutationFn: putStudent,
    onMutate: () => {
      toast.loading("Student yangilanmoqda...", { id: "putStudent" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student o'zgartirildi!", { id: "putStudent" });
      succesSound.play();
    },
    onError: (err) => {
      console.error("PutStudent error:", err);
      toast.error(err.message || "Student o'zgartirishda xatolik!", {
        id: "putStudent",
      });
      errorSound.play();
    },
  });

  const DeleteStudent = useMutation({
    mutationFn: deleteStudent,
    onMutate: () => {
      toast.loading("Student o'chirilmoqda...", { id: "deleteStudent" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student o'chirildi!", { id: "deleteStudent" });
      succesSound.play();
    },
    onError: (err) => {
      console.error("DeleteStudent error:", err);
      toast.error(err.message || "Student o'chirishda xatolik!", {
        id: "deleteStudent",
      });
      errorSound.play();
    },
  });

  return { GetStudents, PostStudent, PutStudent, DeleteStudent };
};

export default useStudents;
