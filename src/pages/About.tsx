import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** About 页已融合进首页「关于我」区块。
 *  此组件保留 /about 路由兼容性，导航到首页并滚动到 #about 锚点。 */
export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
    // 等首页渲染后滚动
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);
  return null;
}
