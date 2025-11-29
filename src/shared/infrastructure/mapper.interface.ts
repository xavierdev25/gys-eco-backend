export interface Mapper<DomainEntity, DbRecord, ResponseDto> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): ResponseDto;
}
