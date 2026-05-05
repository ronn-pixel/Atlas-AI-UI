import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// 1. REVERT to Left: list, Right: profile
content = content.replace(
  `className="flex flex-col lg:flex-row-reverse gap-8 items-start relative min-h-[800px]"`,
  `className="flex flex-col lg:flex-row gap-8 items-start relative min-h-[800px]"`
);

// 2. Restore action column cell completely
const tdRegex = /<td className="px-6 py-4 text-center align-middle">\s*<Button[\s\S]*?<\/Button>\s*<\/td>/;
const actionTd = `<td className="px-6 py-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                           <button 
                            onClick={(e) => { e.stopPropagation(); handleViewMember(member); }}
                            className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all transform active:scale-90"
                            title="View / Entity Registry"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEditClick(member); }}
                            className="p-2 text-text-muted hover:text-trust hover:bg-trust/10 rounded-lg transition-all transform active:scale-90"
                            title="Edit Record"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(member); }}
                            className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all transform active:scale-90"
                            title="Terminate Record"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>`;
content = content.replace(tdRegex, actionTd);

fs.writeFileSync('src/pages/Members.tsx', content);
