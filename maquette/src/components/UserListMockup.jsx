// export default function UserListMockup() {
//   return (
//     <div className="card">
//       <h2 className="title">Utilisateurs</h2>

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-orange-500 text-white">
//             <th className="p-2 text-left">Nom</th>
//             <th className="p-2 text-left">Email</th>
//             <th className="p-2 text-left">Rôle</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[1,2,3].map(i => (
//             <tr key={i} className="border-b">
//               <td className="p-2">Nom {i}</td>
//               <td className="p-2">email{i}@test.com</td>
//               <td className="p-2">user</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button className="btn-disabled mt-4">Ajouter un utilisateur</button>
//     </div>
//   );
// }
import React from "react";

export default function UserListMockup() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card w-[500px]">
        <h2 className="title text-center">Utilisateurs</h2>

        <form className="space-y-4">
          <div>
            <label>Nom</label>
            <input className="form-input" type="text" disabled />
          </div>

          <div>
            <label>Email</label>
            <input className="form-input" type="email" disabled />
          </div>

          <div>
            <label>Rôle</label>
            <input className="form-input" type="text" disabled />
          </div>

          <button className="btn-disabled w-full">Créer un utilisateur</button>
        </form>
      </div>
    </div>
  );
}
